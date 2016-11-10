select * from vehicles
join users
on users.id = "ownerId"
where email = $1;
