'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tasks', [
      {
        id: "7fb83386-488a-4100-8a1e-ceef922a98c9",
        title: "First Task",
        description: "Sample task.",
        status: "pending",
        assigned_user_id: "a2fd4ec0-1de4-4128-b231-303763e8d252",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: "2c4b9f2b-1e5a-4cbb-8b49-123456789abc",
        title: "Second Task",
        description: "Another sample task.",
        status: "completed",
        assigned_user_id: "a2fd4ec0-1de4-4128-b231-303763e8d252",
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], { ignoreDuplicates: true });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tasks', null, {});
  }
};
