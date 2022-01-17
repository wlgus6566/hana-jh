import { pages } from '@/utils/path';

export default [
    {
        path: '/qna',
        component: pages('qna'),
        children: [
            {
                path: '',
                component: pages('qna/list'),
                meta: { title: '고객 Q&A 관리' },
            },
            {
                path: ':id',
                component: pages('qna/detail'),
                meta: { title: '고객 Q&A 관리 상세' },
            },
        ],
    }
]
