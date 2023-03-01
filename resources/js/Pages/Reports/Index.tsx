import ReportItem from "@/Components/Reports/ReportItem";
import AppLayout from "@/Layouts/AppLayout";
import { Report, User } from "vendor";

interface ReportList {
  auth: { user: User };
  reports: Report[];
}

function ReportList(props: ReportList) {
  return (
    <AppLayout auth={props.auth}>
      <h1 className="font-bold text-2xl mb-4">Mis reportes</h1>
      <section className="space-y-5">
        {props.reports.map((r) => (
          <ReportItem key={r.id} report={r} />
        ))}
      </section>
    </AppLayout>
  );
}

export default ReportList;
