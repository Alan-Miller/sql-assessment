select count(*) from users
join vehicles
on users.id = "ownerId"
where users.id = $1
