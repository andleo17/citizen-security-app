import type { Patrol, Report, User, Zone } from "vendor";

import Label from "@/Components/Common/Forms/Label";
import TextAreaInput from "@/Components/Common/Forms/TextAreaInput";
import TextInput from "@/Components/Common/Forms/TextInput";
import Modal from "@/Components/Common/Modal";
import CarLocation from "@/Components/Main/CarLocation";
import ReportMarker from "@/Components/Main/ReportMarker";
import Area from "@/Components/Maps/Area";
import Map, { MapWrapper } from "@/Components/Maps/Map";
import AppLayout from "@/Layouts/AppLayout";
import { pointToJson, polygonToJson } from "@/Utils/Geometry";
import { Head, Link } from "@inertiajs/react";
import { useCallback, useEffect, useState } from "react";
import useSound from "@/Hooks/UseSound";

import alarm from "../../assets/audio/alarma.mp3";
import { getDefaultLocation } from "@/Utils/Config";

interface WatchProps {
  auth: { user: User };
  reports: Report[];
  patrols: Patrol[];
  zones: Zone[];
}

function Watch(props: WatchProps) {
  const [reports, setReports] = useState(props.reports);
  const [selectedReport, setSelectedReport] = useState<Report>();
  const setPlay = useSound(alarm);

  const sendToWhatsApp = useCallback(() => {
    const { lat, lng } = pointToJson(selectedReport.location);
    const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    navigator.clipboard.writeText(googleMapsURL);
  }, [selectedReport]);

  useEffect(() => {
    const channel = Echo.channel("reports");

    channel.listen(".watch.reports", ({ report }: { report: Report }) => {
      setReports((prev) => [...prev, report]);
    });

    return () => {
      channel.stopListening(".watch.reports");
      Echo.leaveChannel("reports");
    };
  }, []);

  useEffect(() => {
    reports.length > 0 ? setPlay(true) : setPlay(false);
  }, [reports]);

  return (
    <AppLayout auth={props.auth}>
      <Head title="Vigilancia" />
      <MapWrapper>
        <Map zoom={15} center={getDefaultLocation()} mapTypeControl={false}>
          {reports.map((r) => (
            <ReportMarker
              key={r.id}
              report={r}
              onClick={() => setSelectedReport(r)}
            />
          ))}
          {props.zones.map((z) => (
            <Area key={z.id} paths={polygonToJson(z.area)} />
          ))}
          <CarLocation initialPatrols={props.patrols} />
        </Map>
      </MapWrapper>
      <Modal show={!!selectedReport} onClose={() => setSelectedReport(null)}>
        <aside>
          <header className="bg-gray-200 dark:bg-gray-900 px-3 py-2 flex justify-between items-center text-gray-800 dark:text-white">
            <h2 className="font-bold text-xl">Nuevo reporte</h2>
            {selectedReport?.emergency && (
              <span className="border-2 border-red-800 bg-red-600 px-3 py-1 rounded-2xl text-xs font-bold text-white mt-2">
                SOS
              </span>
            )}
          </header>
          <section className="p-3 space-y-3">
            <TextInput
              id="citizen"
              labelText="Ciudadano"
              defaultValue={selectedReport?.user.fullname}
              readOnly
            />
            <TextAreaInput
              id="description"
              labelText="Descripción"
              defaultValue={selectedReport?.description}
            />
            {selectedReport?.images && (
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="images" value="Fotos" />
                </div>
                <div className="flex gap-2 flex-col sm:flex-row overflow-x-auto">
                  {selectedReport.images.map((i) => (
                    <img
                      src={"/" + i}
                      alt={i}
                      key={i}
                      className="w-full sm:w-80 object-cover"
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
          <footer className="p-3 flex justify-between">
            <Link
              href={route("reports.attend", {
                report: selectedReport?.id || -1,
              })}
              method="post"
              as="button"
              className="text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              onSuccess={() => {
                setReports((prev) =>
                  prev.filter((r) => r.id !== selectedReport.id)
                );
                setSelectedReport(null);
              }}
            >
              Atender
            </Link>
            <button
              type="button"
              onClick={sendToWhatsApp}
              className="text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Enviar a WhatsApp
            </button>
          </footer>
        </aside>
      </Modal>
    </AppLayout>
  );
}

export default Watch;
