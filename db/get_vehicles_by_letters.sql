select * from vehicles
join users
on users.id = "ownerId"
WHERE firstname LIKE $1
