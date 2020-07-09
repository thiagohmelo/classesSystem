Intl = require('intl')
const db = require('../../config/db')
const { age, date } = require ('../../lib/utils')

module.exports= {
    all(callback) {

        db.query(`SELECT professors.*, count(students) AS total_students
        FROM professors
        LEFT JOIN students ON (students.professor_id = professors.id)
        GROUP BY professors.id
        ORDER BY total_students DESC`, function(err, results){
            if(err) throw 'database error'

            callback(results.rows)

        })

    },
    create(data, callback) {

        const query = `
        INSERT INTO professors (
            name,
            avatar_url,
            education,
            subject,
            format,
            birth,
            created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
    `   

    const values = [
        data.name,
        data.avatar_url,
        data.education,
        data.subject,
        data.format,
        date(data.birth).iso,
        date(Date.now()).iso
        
    ]

    db.query(query, values, function(err, results){
        if(err) throw 'database error'
        
        callback(results.rows[0])
    })

    },
    find(id, callback) {
        db.query(`SELECT * FROM professors WHERE id = $1`, [id], function(err, results){
            if(err) throw `databse error ${err}`

            callback(results.rows[0])
        })
    },
    findBy(filter,callback) {
        db.query(`
        SELECT professors.*, count(students) AS total_students
        FROM professors
        LEFT JOIN students ON (students.professor_id = professors.id)
        WHERE professors.name ILIKE '%${filter}%'
        OR professors.subject ILIKE '%${filter}%'
        GROUP BY professors.id
        ORDER BY total_students DESC`, function(err, results){
            if(err) throw 'database error'

            callback(results.rows)

        })

    },
    update(data, callback) {
        const query = `
        UPDATE professors SET
        avatar_url=($1),
        name=($2),
        birth=($3),
        education=($4),
        format=($5),
        subject=($6)
        WHERE id = $7
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.education,
            data.format,
            data.subject,
            data.id
        ]
        db.query(query, values, function(err, results){
            if(err) throw `database error ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM professors WHERE id = $1`, [id], function(err, results){
            if(err) throw `database error ${err}`

            return callback()
        })
    }

}