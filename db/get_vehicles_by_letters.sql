select * from vehicles
join users
on users.id = "ownerId"
WHERE firstname LIKE $1
-- WHERE firstname LIKE $1 || '%'
