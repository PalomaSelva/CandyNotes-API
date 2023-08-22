exports.up = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.string("avatar", 128);
  });
};

exports.down = function (knex) {
  return knex.schema.table("users", (table) => {
    table.dropColumn("avatar");
  });
};
