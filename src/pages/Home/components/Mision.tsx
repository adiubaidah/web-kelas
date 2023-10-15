import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { missions } from "../../../constant"
function Mision() {
    return (
        <div className='container mt-28'>
            <h2 className="text-[32px] text-center font-bold leading-[48px]">Misi Kami</h2>
            <div className='mt-12'>
                <VerticalTimeline>
                    {
                        missions.map((item, index) => (
                            <VerticalTimelineElement
                                key={index}
                                contentStyle={{ background: '#0E1E45', color: '#fff' }}
                                contentArrowStyle={{ borderRight: '7px solid #0E1E45' }}>
                                <h3 className="font-bold text-[32px]">{item.title}</h3>
                                <p className='font-dm leading-7 font-normal'>
                                    {item.text}
                                </p>
                            </VerticalTimelineElement>
                        ))
                    }
                </VerticalTimeline>
            </div>
        </div>
    )
}

export default Mision