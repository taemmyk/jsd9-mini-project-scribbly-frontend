import React, { useState, useEffect, useContext } from "react";
import { ChevronDown, Home, StickyNote, Settings, Tag, Hash, DoorOpen, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import UserContext from "./contexts/user-context";

const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "New note",
    url: "/note/new",
    icon: StickyNote,
  },
];

const accountItems = [
  {
    title: "View as public",
    url: "#",
    icon: DoorOpen,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
  },
];

// Mockup Tags
const tags = ["Personal", "Work", "Ideas", "Reading"];

export function AppSidebar() {
  const context = useContext(UserContext);
  const user = context ? context.user : null;
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  return (
    <Sidebar>
      <SidebarContent className="flex flex-col justify-between h-full">
        <div>
          <div className="my-18 flex justify-center">
            <h1
              style={{ fontFamily: '"Gluten", cursive' }}
              className="text-4xl text-rose-400"
            >
              Scribbly
            </h1>
          </div>
          <SidebarGroup>
            <SidebarGroupLabel className="text-rose-500 text-lg">
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        to={item.url}
                        className="flex items-center space-x-2 text-rose-950"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {user && (
            <>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarGroup>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="w-full flex items-center justify-between rounded-md px-2 py-1.5 text-sm font-medium hover:bg-secondary focus:outline-none">
                      <div className="flex items-center space-x-2 text-rose-500 text-lg">
                        <Tag className="h-4 w-4" />
                        <span>Note Tags</span>
                      </div>
                      <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent className="space-y-1">
                    {tags.map((tag) => (
                      <SidebarMenuItem key={tag} className="list-none">
                        <SidebarMenuButton asChild>
                          <Link
                            to={`/tags/${tag}`}
                            className="flex items-center space-x-2"
                          >
                            <Hash className="w-4 h-4 rounded-sm" />
                            <span>{tag}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
              <SidebarGroup>
                <SidebarGroupLabel className="text-rose-500 text-lg">
                  Account
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {accountItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <Link
                            to={item.url}
                            className="flex items-center space-x-2"
                          >
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
