import React from 'react'
import { Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import SettingsPage from '../pages/SettingsPage'
import ProjectsPage from '../pages/ProjectsPage'
import ProjectPage from '../pages/ProjectPage'
import AboutPage from '../pages/AboutPage'
import ExportPage from '../pages/ExportPage'

class Content extends React.Component {
  render() {
    return (
      <Container className="appContent">
        <Route path="/" exact component={ProjectsPage} />
        <Route path="/about" exact component={AboutPage} />
        <Route path="/projects" exact component={ProjectsPage} />
        <Route path="/project/:id" exact component={ProjectPage} />
        <Route path="/settings" exact component={SettingsPage} />
        <Route path="/export" exact component={ExportPage} />
      </Container>
    )
  }
}

export default Content
