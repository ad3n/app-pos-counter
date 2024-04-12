import { Dropdown, Datepicker, Modal, Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import momment from 'moment'
import moment from 'moment';
import { update } from 'lodash';

export enum EKeys {
    today = "Hari ini",
    yesterday = "Kemaren",
    customDate = "Pilih Tanggal"
}

export type IProps = {
    handleUpdate:(date:Date)=>void
}

export function FilterDateTransactions(_props:IProps) {
    const [state, setState]  = useState<string>(EKeys.today)
    const [update, setUpdate]  = useState<boolean>(false)
    const [openmodal, setOpenModal]  = useState<boolean>(false)
    const [curDate, setCurDate]  = useState<Date>(new Date())

    useEffect(()=>{
        console.log("lloged", "gola")
        if( update ) {
            _props.handleUpdate(curDate)
        }

        return () => {
            setUpdate(false)
        }
    },[update, setUpdate])

    const onFilter = (key:string) => {
        setState(key)

        if( key === EKeys.today ) {
            setCurDate(new Date())
        } else if( key === EKeys.yesterday) {
            setCurDate(moment().subtract(1, 'day').toDate())
        }
        
       
        if( key === EKeys.customDate) {
            setOpenModal(true)
        } else {
            setUpdate(true)
        }
    }

    const onClose = () => {
        setState(prev=>prev)
        setOpenModal(false)
    }

    const onSelectedDateChanged = (date: Date) => {
        setOpenModal(false)
        setUpdate(true)
        setCurDate(date)
    }

    return (<div>
            <Dropdown color="gray" label={state === EKeys.customDate && curDate ? moment(curDate).format("DD MMM YYYY"): state}>
                <Dropdown.Item as="button" value={EKeys.today} 
                    onClick={()=>onFilter(EKeys.today)}>Hari ini</Dropdown.Item>
                <Dropdown.Item value={EKeys.yesterday} 
                    onClick={()=>onFilter(EKeys.yesterday)}>Kemaren</Dropdown.Item>
                <Dropdown.Item value={EKeys.customDate} 
                    onClick={()=>onFilter(EKeys.customDate)}>Pilih Tanggal</Dropdown.Item>
            </Dropdown>
            {state === EKeys.customDate && 
            <Modal size={"sm"} show={openmodal} onClose={onClose}>
                <Modal.Header>Pilih Tanggal</Modal.Header>
                <Modal.Body>
                    <Datepicker 
                        defaultDate={curDate} 
                        onSelectedDateChanged={onSelectedDateChanged} 
                        maxDate={new Date()} 
                        showClearButton={false}
                        inline />
                </Modal.Body>
            </Modal>}
        </div>
    );
}