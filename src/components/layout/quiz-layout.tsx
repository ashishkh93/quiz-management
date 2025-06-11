"use client";

// @ts-ignore
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Menu, X, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Inter } from "next/font/google";
import { paths } from "@/routes/path";

const inter = Inter({ subsets: ["latin"] });

const QuizLayout = ({ children }: IChildren) => {
  const user = {
    name: "Ashish",
  };

  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    {
      name: "Quiz Management",
      href: paths.quiz_management.root,
      icon: LayoutDashboard,
    },
    // { name: "Add New", href: "/dashboard/new", icon: Plus },
  ];

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${inter.className}`}
    >
      {/* Top Bar */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div
              className="flex items-center justify-between"
              style={{ width: "calc(100% - 1000px)" }}
            >
              <div className="flex-shrink-0 flex items-center ml-2 lg:ml-0">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Dashboard
                </h1>
              </div>
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  // className="lg:hidden"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  {sidebarOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                <User className="h-4 w-4" />
                <span>{user?.name}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                // onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 min-h-[calc(100vh-65px)]">
        {/* Sidebar */}
        <nav
          className={`
          ${
            sidebarOpen
              ? "!w-64 sm:w-16 translate-x-0"
              : "w-0 sm:!w-16 -translate-x-full"
          }
          lg:translate-x-0 transition-all duration-200 ease-in-out
          fixed lg:static inset-y-0 left-0 z-50 
          bg-white dark:bg-gray-800 shadow-lg lg:shadow-none
          border-r border-gray-200 dark:border-gray-700
          pt-16 lg:pt-0
        `}
        >
          <SimpleBar
            style={{ maxHeight: "100vh" }}
            className="px-3 py-6 h-full"
          >
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`
                        flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium
                        transition-colors duration-200 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200
                      `}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {sidebarOpen && <span>{item.name}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </SimpleBar>
        </nav>
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-transparent bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {/* Main Content */}
        <main className="flex-1 lg:ml-0 h-[calc(100vh-68px)] overflow-y-auto">
          <div className="px-4 sm:px-6 lg:px-4 py-4 flex flex-col">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default QuizLayout;
