const ROOTS = {
  DASHBOARD: "/dashboard",
};

// ----------------------------------------------------------------------

export const paths = {
  // AUTH
  auth: {
    login: "/login",
  },
  quiz_management: {
    root: "/quiz-management",
    create: "/quiz-management/create",
    edit: (id: string) => `/quiz-management/${id}/edit`,
    schedule: "/quiz-management/schedule",
    view: "/quiz-management/view",
    detail: "/quiz-management/detail",
  },
};
