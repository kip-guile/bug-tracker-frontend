import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import * as creators from '../../state/actionCreators'
import ProjectList from './list'


const Projects = () => {


    const allProjects = useSelector(state => state.projects)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(creators.getProjects())
    }, [dispatch])

    console.log(allProjects)

    return (
        <ProjectList projects={allProjects}/>
    )
}

export default Projects