//crea la base de datos etrust
// crea el usuario test en etrust
if (db.getUser("test") == null) {
  db.createUser(
    {
      user: "test",
      pwd: "scretisimo",
      roles: ["readWrite", "dbAdmin"]
    }
  );
}