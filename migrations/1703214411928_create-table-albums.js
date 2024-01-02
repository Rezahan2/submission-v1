exports.up = (pgm) => {
  pgm.createTable('albums', {
    id: {
      type: 'VARCHAR(30)',
      primaryKey: true
    },
    name: {
      type: 'VARCHAR(50)',
      notnull: true
    },
    year: {
      type: 'INT',
      notnull: true
    }
  })
}

exports.down = (pgm) => {
  pgm.dropTable('albums')
}
