import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import * as creators from '../../state/actionCreators'
import AssignedBugsTable from './list';


const AssignedBugs = () => {


    const allAssignedBugs = useSelector(state => state.assignedBugs)
    const dispatch = useDispatch()

    const withKey = allAssignedBugs.map(bug => 
        ({...bug, key: bug.id,})
    )

    useEffect(() => {
        dispatch(creators.getAssignedBugs())
    }, [dispatch])

    return (
        <AssignedBugsTable bugs={withKey}/>
    )
}

export default AssignedBugs