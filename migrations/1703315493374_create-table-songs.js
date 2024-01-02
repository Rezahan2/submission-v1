exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(30)',
      primaryKey: true
    },
    title: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    year: {
      type: 'INT',
      notNull: true
    },
    performer: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    genre: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    duration: {
      type: 'INT',
      notNull: false
    },
    albumid: {
      type: 'VARCHAR(30)',
      notNUll: false
    }
  })
}

exports.down = (pgm) => {
  pgm.dropTable('songs')
}
