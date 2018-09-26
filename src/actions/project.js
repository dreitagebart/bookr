import api from '../api'
import store from '../reducers/store'

export const PROJECTS_RECEIVED = 'PROJECTS_RECEIVED'
export const PROJECT_RECEIVED = 'PROJECT_RECEIVED'
export const PROJECT_SET = 'PROJECT_SET'
export const PROJECT_MODAL = 'PROJECT_MODAL'
export const PROJECT_RENAME = 'PROJECT_RENAME'
export const PROJECT_DELETE = 'PROJECT_DELETE'

export const setProjectRename = boolean => ({
  type: PROJECT_RENAME,
  payload: boolean
})

export const setProjectModal = boolean => ({
  type: PROJECT_MODAL,
  payload: boolean
})

export const projectsReceived = projects => ({
  type: PROJECTS_RECEIVED,
  payload: projects
})

export const setProject = project => ({
  type: PROJECT_SET,
  payload: project
})

export const getProjects = () => dispatch => {
  dispatch(projectsReceived(api.project.getAll()))
}

export const updateProjects = projects => dispatch => {
  api.project.setAll(projects)
  dispatch(projectsReceived(projects))
}

export const updateProject = project => dispatch => {
  let { projects } = store.getState().root

  api.project.set(project)

  dispatch(
    projectsReceived(
      projects.map(p => {
        if (p.id === project.id) {
          return project
        } else {
          return p
        }
      })
    )
  )
  dispatch(setProject(project))
}

export const addBooking = (id, data) => dispatch => {
  const payload = { ...data, id: api.getHash() }

  let { projects } = store.getState().root

  let project = projects.find(p => p.id === id)

  if (!project.bookings) {
    project.bookings = [{ ...payload }]
  } else {
    project.bookings = [{ ...payload }, ...project.bookings]
  }

  projects = projects.map(p => {
    if (p.id === id) return project
    return p
  })

  dispatch(updateProjects(projects))
  dispatch(setProject(project))
}

export const deleteBooking = (projectId, bookingId) => dispatch => {
  let { projects } = store.getState().root

  let project = projects.find(p => p.id === projectId)

  project.bookings = project.bookings.filter(b => b.id !== bookingId)

  projects = projects.map(p => {
    if (p.id === projectId) return project
    return p
  })

  dispatch(updateProjects(projects))
  dispatch(setProject(project))
}

export const updateBooking = (projectId, bookingId, value) => dispatch => {
  let { projects } = store.getState().root

  let project = projects.find(p => p.id === projectId)

  project.bookings = project.bookings.map(b => {
    if (b.id === bookingId) return { ...b, value }
    return b
  })

  projects = projects.map(p => {
    if (p.id === projectId) return project
    return p
  })

  dispatch(updateProjects(projects))
  dispatch(setProject(project))
}

export const setProjectDelete = boolean => ({
  type: PROJECT_DELETE,
  payload: boolean
})
