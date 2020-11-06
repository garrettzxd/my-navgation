import { LinkListItem } from './index';

export default {};

export const linkList: LinkListItem[] = [
  {
    title: 'vue',
    details: [
      {
        linkUrl: 'https://cn.vuejs.org/',
        imageUrl: 'https://cn.vuejs.org/images/icons/favicon-96x96.png',
        text: 'vue官网',
      },
      {
        linkUrl: 'https://reactjs.bootcss.com/docs/hooks-intro.html',
        imageUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K',
        text: 'React',
      },
    ],
  },
  {
    title: '购物',
    details: [{
      linkUrl: 'https://hd.com',
      imageUrl: 'https://www.jianfast.com/static/home/images/siteimg/i0.png',
      text: '京东',
    }],
  },
];
