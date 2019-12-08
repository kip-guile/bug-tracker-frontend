import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import * as creators from '../../state/actionCreators'
import ProjectList from './list'


const Projects = () => {


    const allProjects = useSelector(state => state.projects)
    const dispatch = useDispatch()

    const withKey = allProjects.map(project => 
        ({...project, key: project.id,})
    )

    useEffect(() => {
        dispatch(creators.getProjects())
    }, [dispatch])

    return (
        <ProjectList projects={withKey}/>
    )
}

export default Projects