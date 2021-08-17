import React from 'react'
import FixedRoundBox from '../common/FixedRoundBox'
import {Link} from 'gatsby'

export default function Meetings() {
    return (
        <FixedRoundBox>
            <div className="flex justify-between items-center text-primary">
                <h3 className="text-md font-semibold">Upcoming Meetings</h3>
                
            </div>
            <div className="absolute bottom-0 left-0 h-10 flex items-center justify-between w-full py-7 px-5 border-t border-gray-100">
                <h6 className="text-xs text-red-500 font-semibold">02 Meetings for today</h6>
                <Link to="/dashboard/meetings" className="flex items-center space-x-2">
                    <h4 className="text-xs">View all</h4>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </Link>
            </div>
        </FixedRoundBox>
    )
}