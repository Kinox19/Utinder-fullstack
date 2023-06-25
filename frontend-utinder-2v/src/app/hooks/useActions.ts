import { useMemo } from 'react';
import { useDispatch } from 'react-redux'
import { bindActionCreators } from '@reduxjs/toolkit'




export const useActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch])
}