// ----------------------------------------------------------------------

const users = [
  {
    id: 1,
    name: 'John',
    email: 'john.smith@mail.com',
    createddate: '2022-01-16 18:47 UTC',
    status: 'Active',
    userrole: 'VIP Guest',
    manageattendees: {
      create: true,
      delete: false,
      edit: true,
      export: false,
      view: true
    },
    manageinformations: {
      create: true,
      delete: false,
      edit: true,
      export: false,
      view: true
    },
    manageusers: {
      create: false,
      delete: true,
      edit: true,
      export: true,
      view: false
    },
    manageagenda: {
      create: true,
      delete: false,
      edit: true,
      export: true,
      view: true
    },
    managepolls: {
      create: false,
      delete: true,
      edit: true,
      export: false,
      view: true
    },
    managenotification: {
      create: false,
      delete: false,
      edit: true,
      export: true,
      view: true
    },
    manageworkshop: {
      create: false,
      delete: false,
      edit: true,
      export: false,
      view: false
    }
  },
  {
    id: 2,
    name: 'Johnn',
    email: 'johnn.smith@mail.com',
    createddate: '2022-02-10 12:13 UTC',
    status: 'Inactive',
    userrole: 'Guest',
    manageattendees: {
      create: true,
      delete: false,
      edit: true,
      export: false,
      view: true
    },
    manageinformations: {
      create: false,
      delete: false,
      edit: true,
      export: false,
      view: true
    },
    manageusers: {
      create: false,
      delete: true,
      edit: false,
      export: true,
      view: false
    },
    manageagenda: {
      create: true,
      delete: false,
      edit: true,
      export: true,
      view: true
    },
    managepolls: {
      create: false,
      delete: true,
      edit: true,
      export: false,
      view: false
    },
    managenotification: {
      create: false,
      delete: false,
      edit: true,
      export: false,
      view: true
    },
    manageworkshop: {
      create: false,
      delete: false,
      edit: true,
      export: false,
      view: false
    }
  },
  {
    id: 3,
    name: 'Johnnn',
    email: 'johnnn.smith@mail.com',
    createddate: '2022-02-10 12:13 UTC',
    status: 'Active',
    userrole: 'Guest',
    manageattendees: {
      create: true,
      delete: false,
      edit: true,
      export: false,
      view: true
    },
    manageinformations: {
      create: true,
      delete: true,
      edit: true,
      export: false,
      view: true
    },
    manageusers: {
      create: false,
      delete: true,
      edit: true,
      export: true,
      view: false
    },
    manageagenda: {
      create: true,
      delete: true,
      edit: true,
      export: true,
      view: true
    },
    managepolls: {
      create: true,
      delete: true,
      edit: true,
      export: false,
      view: true
    },
    managenotification: {
      create: false,
      delete: true,
      edit: true,
      export: true,
      view: true
    },
    manageworkshop: {
      create: false,
      delete: false,
      edit: true,
      export: false,
      view: false
    }
  }
];
export default users;
