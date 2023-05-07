import React from 'react';

export const TechnoType = (props) => {

    return (
        <div>
            <div className='catalog-filter'>
                <div className='product-type'>
                        <p>Product Type</p>
                    </div>
                    <div>
                        <input name='phone' type="checkbox" className='filter-phone' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-phone' htmlFor='phone' >Phone</label>
                    </div>
                    <div>
                        <input name='TV' type="checkbox" className='filter-TV' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-TV' htmlFor='TV'>TV</label>
                    </div>
                    <div>
                        <input name='headphone' type="checkbox" className='filter-headphone' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-headphone' htmlFor='headphone'>Headphone</label>
                    </div>
                    <div className='product-type'>
                        <p>Product Brand</p>
                    </div>
                    <div>
                        <input name='meizu' type="checkbox" className='filter-phone' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-phone' htmlFor='meizu' >Meizu</label>
                    </div>
                    <div>
                        <input name='samsung' type="checkbox" className='filter-headphone' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-headphone' htmlFor='samsung'>Samsung</label>
                    </div>
                    <div>
                        <input name='redmi' type="checkbox" className='filter-TV' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-TV' htmlFor='redmi'>Redmi</label>
                    </div>
                    <div>
                        <input name='apple' type="checkbox" className='filter-headphone' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-headphone' htmlFor='apple'>Apple</label>
                    </div>
                    <div>
                        <input name='honor' type="checkbox" className='filter-TV' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-TV' htmlFor='honor'>Honor</label>
                    </div>
                    <div>
                        <input name='Maibenben' type="checkbox" className='filter-headphone' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-headphone' htmlFor='Maibenben'>Maibenben</label>
                    </div>
                </div>
        </div>
    )
}
