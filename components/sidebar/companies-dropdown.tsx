"use client";
import { Link } from "@nextui-org/react";
import React, { useState } from "react";
import { AcmeIcon } from "../icons/acme-icon";

interface Company {
  name: string;
  location: string;
  logo: React.ReactNode;
}

export const CompaniesDropdown = () => {
  const [company, setCompany] = useState<Company>({
    name: "Magic Build.",
    location: "Stack for SUI",
    logo: <AcmeIcon />,
  });
  return (
    <Link
      href="/"
    >
      <div className="flex items-center gap-2">
        {company.logo}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
            {company.name}
          </h3>
          <span className="text-xs font-medium text-default-500">
            {company.location}
          </span>
        </div>
      </div>
    </Link>
  );
};
