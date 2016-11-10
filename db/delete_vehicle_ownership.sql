update vehicles
  set "ownerId" = NULL
  where vehicles.id = $1;
