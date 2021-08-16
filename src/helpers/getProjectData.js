
/**
 * get project hour rate from entry item
 * @param {*} entry 
 * @param {*} clients 
 * @returns 
 */
export const getProjectHourRate = (entry, clients) => {
    const client = clients.find((client) => client.id === entry.clientId);
    return client.projects.find((project) => project.id === entry.projectId);
  };