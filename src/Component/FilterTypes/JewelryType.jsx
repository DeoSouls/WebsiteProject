import React from 'react';

export const JewelryType = (props) => {

    return (
        <div>
            <div className='catalog-filter'>
                <div className='product-type'>
                        <p>Product Type</p>
                    </div>
                    <div>
                        <input name='ring' type="checkbox" className='filter-phone' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-phone' htmlFor='ring' >Ring</label>
                    </div>
                    <div>
                        <input name='earrings' type="checkbox" className='filter-TV' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-TV' htmlFor='earrings'>Earrings</label>
                    </div>
                    <div>
                        <input name='chain' type="checkbox" className='filter-headphone' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-headphone' htmlFor='chain'>Chain</label>
                    </div>
                    <div>
                        <input name='suspension' type="checkbox" className='filter-headphone' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-headphone' htmlFor='suspension'>Suspension</label>
                    </div>
                    <div className='product-type'>
                        <p>Product Brand</p>
                    </div>
                    <div>
                        <input name='sunlight' type="checkbox" className='filter-phone' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-phone' htmlFor='sunlight' >Sunlight</label>
                    </div>
                    <div>
                        <input name='yakutia' type="checkbox" className='filter-headphone' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-headphone' htmlFor='yakutia'>Yakutia</label>
                    </div>
                    <div>
                        <input name='efremov' type="checkbox" className='filter-TV' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-TV' htmlFor='efremov'>Efremov</label>
                    </div>
                    <div>
                        <input name='krastmet' type="checkbox" className='filter-headphone' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-headphone' htmlFor='krastmet'>Krastmet</label>
                    </div>
                    <div>
                        <input name='bronickiy' type="checkbox" className='filter-TV' onChange={e => props.filterObject(e)}/>
                        <label className='label-check-TV' htmlFor='bronickiy'>Bronickiy</label>
                    </div>
                </div>
        </div>
    )
}
