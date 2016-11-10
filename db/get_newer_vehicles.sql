select year, make, model, firstname, lastname from vehicles
join users
on users.id = "ownerId"
where year > 2000
order by year desc;
