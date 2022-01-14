import { pages } from '@/utils/path';

export default [
    {
        path: '/qna',
        component: pages('qna'),
        meta: { title: '고객 Q&A 관리' },
        children: [
            {
                path: ':id',
                component: pages('qna/detail'),
                meta: { title: '고객 Q&A 관리 상세' },
            },
        ],
    }
]
