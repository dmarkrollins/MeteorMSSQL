ContactSchema = new SimpleSchema({
  id: {
      type: Number,
      optional: true,
      autoform: {
          omit: true
      }
  },
  firstName: {
    type: String,
    label: "First Name",
    max: 50
  },
  lastName: {
    type: String,
    label: "Last Name",
    max: 50
  },
  birthDate: {
    type: Date,
    label: "Birth Date"
  },
  occupation: {
    type: String,
    max: 60
  },
  comment: {
    type: String,
    label: "About",
    optional: true,
    autoform: {
        rows: 5
    },
    max: 4098
  }
});
