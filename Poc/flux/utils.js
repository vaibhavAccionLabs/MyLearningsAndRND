const renameKey = (oldkey, newkey, obj) => {
  const {[oldkey]: old, ...rest} = obj;
  return {
    ...rest,
    [newkey]: new Date(old),
  };
};

const renameKeys = (keys, obj) => {
  Object.keys(keys).forEach(
    oldkey => (obj = renameKey(oldkey, keys[oldkey], obj))
  );
  return obj;
};

const transformEvents = events =>
  events.map(evt => renameKeys({start_date: 'start', end_date: 'end'}, evt));

const personalEvent = (events, srm_user_uuid) => {
  return events.filter(event => srm_user_uuid === event.created_by);
};

const filterEvent = (events, srm_user_uuid, filter) => {
  if (filter === 'personal') {
    return personalEvent(events, srm_user_uuid);
  } else if (filter === 'community') {
    return events;
  }
};

export const filterEvents = (events, srm_user_uuid, filter) =>
  filterEvent(transformEvents(events), srm_user_uuid, filter);
