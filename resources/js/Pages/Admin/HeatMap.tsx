import type { Report, ReportCategory, ReportSubCategory, User } from "vendor";

import SelectInput from "@/Components/Common/Forms/SelectInput";
import HeatMapLayer from "@/Components/Maps/HeatMapLayer";
import Map, { MapWrapper } from "@/Components/Maps/Map";
import AdminLayout from "@/Layouts/AdminLayout";
import { getDefaultLocation } from "@/Utils/Config";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

interface HeatMapProps {
  auth: { user: User };
  reports: Report[];
  categories: ReportCategory[];
}

interface HeatMapFilters {
  category: ReportCategory;
  subCategory: ReportSubCategory;
}

function HeatMap({ auth, reports: initialReports, categories }: HeatMapProps) {
  const [reports, setReports] = useState(initialReports);
  const [filters, setFilters] = useState<HeatMapFilters>({
    category: undefined,
    subCategory: undefined,
  });

  useEffect(() => {
    setReports(() => {
      if (filters.subCategory) {
        return initialReports.filter((r) => {
          if (!r.report_sub_category_id) return false;
          return r.report_sub_category_id === filters.subCategory.id;
        });
      }

      if (filters.category) {
        return initialReports.filter((r) => {
          if (!r.report_sub_category_id) return false;
          return (
            r.report_sub_category.report_category_id === filters.category.id
          );
        });
      }

      return initialReports;
    });
  }, [filters]);

  return (
    <AdminLayout auth={auth}>
      <Head title="Mapa de calor" />
      <div className="flex flex-col h-full">
        <div className="flex gap-4 mb-4 items-center">
          <SelectInput
            id="category_id"
            value={filters.category?.id || -1}
            labelText="Categoría"
            placeholder="Seleccione un filtro de categoría"
            onChange={(e) =>
              setFilters({
                category: categories.find(
                  (c) => c.id === Number(e.target.value)
                ),
                subCategory: undefined,
              })
            }
            inline
          >
            {categories.map((c) => (
              <SelectInput.Item key={c.id} value={c.id}>
                {c.name}
              </SelectInput.Item>
            ))}
          </SelectInput>
          <SelectInput
            id="sub_category_id"
            value={filters.subCategory?.id || -1}
            labelText="Sub categoría"
            placeholder="Seleccione un filtro de sub categoría"
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                subCategory: filters.category?.sub_categories?.find(
                  (c) => c.id === Number(e.target.value)
                ),
              }))
            }
            inline
          >
            {filters.category?.sub_categories?.map((c) => (
              <SelectInput.Item key={c.id} value={c.id}>
                {c.name}
              </SelectInput.Item>
            ))}
          </SelectInput>
          <div className="ml-auto">
            <b>Reportes registrados:</b>
            <span className="ml-2">{reports.length}</span>
          </div>
        </div>
        <MapWrapper>
          <Map
            zoom={15}
            center={getDefaultLocation()}
            mapTypeControl={false}
            className="flex-grow"
          >
            <HeatMapLayer rawData={reports.map((r) => r.location)} />
          </Map>
        </MapWrapper>
      </div>
    </AdminLayout>
  );
}

export default HeatMap;
