"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "@/config";


interface TaskType {

    "id": number,
    "title": string,
    "amount": number,
    "option": {
        "id": number,
        "image_url": string,
        "task_id": number,
    }[]

}

export default function NextTask() {
    const [task, setTask] = useState<TaskType | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);


    useEffect(() => {
        setLoading(true);
        axios.get(`${BACKEND_URL}/v1/worker/nextTask`, {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNTc2NDU2OH0.cFKW-oXFLoSq6HTvRBoIdJLN2LokEO4-z5Nzh_Pizxs'
            }
        }).then(res => {
            setTask(res.data.task);
            setLoading(false);
        }).catch(e => {
            console.log(e);
            setLoading(false);
        })

    }, [])



    if (loading) {
        return <p className="h-screen w-screen flex justify-center items-center">Loading...</p>
    }



    if (!task) {
        return (
            <p className="h-screen w-screen flex justify-center items-center">There's no current task. Please try after sometime</p>
        )
    }

    return (
        <>
            <div className="mt-8">
                <h1 className="text-2xl font-bold text-center tracking-wide uppercase">{task.title}</h1>
                {submitting ? <p>Submitting...</p> : ""}
                <div className="flex  justify-between items-center w-1/2 mx-auto p-4   ">
                    <div className="flex w-full gap-4  justify-center items-center">
                        {
                            task.option.map(option => {

                                return (
                                    <img onClick={async () => {
                                        if(submitting) return;
                                        setSubmitting(true);
                                        try {
                                            const res = await axios(`${BACKEND_URL}/v1/worker/submission`, {
                                                method: 'POST',
                                                data: {
                                                    taskId: task.id,
                                                    selection: option.id,
                                                },
                                                headers: {
                                                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxNTc2NDU2OH0.cFKW-oXFLoSq6HTvRBoIdJLN2LokEO4-z5Nzh_Pizxs'
                                                }
                                            })
                                            const nextTask = res.data.nextTask;

                                            if (nextTask) {
                                                setTask(nextTask);
                                            }
                                            else {
                                                setTask(null);
                                            }
                                        }
                                        catch(e){
                                            console.log(e);
                                        }
                                        setSubmitting(false);
                                    }} src={option.image_url} className="w-64 cursor-pointer" />

                                )
                            })
                        }
                    </div>


                </div>
            </div>
        </>
    )
}