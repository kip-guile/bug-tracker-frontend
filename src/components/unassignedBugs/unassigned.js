import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import * as creators from '../../state/actionCreators'
import UnassignedBugs from './list'


const AllBugs = () => {


    const allBugs = useSelector(state => state.bugs)
    const dispatch = useDispatch()

    const withKey = allBugs.map(bug => 
        ({...bug, key: bug.id,})
    )

    useEffect(() => {
        dispatch(creators.getBugs())
    }, [dispatch])

    return (
        <UnassignedBugs projects={withKey}/>
    )
}

export default AllBugs