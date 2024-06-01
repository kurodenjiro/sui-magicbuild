import type { NextPage } from "next";
import { ClientPage } from "@/components/client";

const Client = ({params}:any) => {
  return <ClientPage params={params} />;
};

export default Client;
