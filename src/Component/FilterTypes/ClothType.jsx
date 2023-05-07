import React from 'react';

export const ClothType = (props) => {

    return (
        <div>
            <div className='catalog-filter'>
                <div className='product-type'>
                        <p>Product Type</p>
                    </div>
                    <div>
                        <input name='cloths' type="checkbox" className='filter-phone' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-phone' htmlFor='cloths' >Одежда</label>
                    </div>
                    <div>
                        <input name='shoes' type="checkbox" className='filter-TV' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-TV' htmlFor='shoes'>Обувь</label>
                    </div>
                    <div>
                        <input name='accessories' type="checkbox" className='filter-headphone' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-headphone' htmlFor='accessories'>Аксессуары</label>
                    </div>
                    <div className='product-type'>
                        <p>Product Brand</p>
                    </div>
                    <div>
                        <input name='Malagrida' type="checkbox" className='filter-phone' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-phone' htmlFor='Malagrida' >Malagrida</label>
                    </div>
                    <div>
                        <input name='Boss' type="checkbox" className='filter-headphone' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-headphone' htmlFor='Boss'>Boss</label>
                    </div>
                    <div>
                        <input name='KLJeans' type="checkbox" className='filter-TV' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-TV' htmlFor='KLJeans'>KL Jeans</label>
                    </div>
                    <div>
                        <input name='Reebok' type="checkbox" className='filter-headphone' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-headphone' htmlFor='Reebok'>Reebok</label>
                    </div>
                    <div>
                        <input name='PUMA' type="checkbox" className='filter-TV' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-TV' htmlFor='PUMA'>PUMA</label>
                    </div>
                </div>
        </div>
    )
}
