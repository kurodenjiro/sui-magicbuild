import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import { CreateClient } from "../create-client";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const [clients, setClients] = React.useState([]);
  const getClientData = async () => {
    console.log("localStorage.getItem('userId')", localStorage.getItem('userId'))
    const clientRes = await fetch(`/api/clients?userId=${localStorage.getItem('userId')}`)
    const clients = await clientRes.json();
    setClients(clients.result)
  }
  React.useEffect(() => {
    getClientData()
  }, [])
  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <CreateClient />
            <SidebarMenu title="Client">
              {clients && clients.map((client:any) =>
                <SidebarItem
                  isActive={pathname === `/client/${client.id}`}
                  title={client.name}
                  icon={<DevIcon />}
                  href={`/client/${client.id}`}
                />
              )}
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <SettingsIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <FilterIcon />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
