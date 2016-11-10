update vehicles
  set "ownerId" = $2
  where vehicles.id = $1
