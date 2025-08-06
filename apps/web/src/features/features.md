1. 크게 도메인 별로 분리 (Auction, Auth, User, Episode)
2. 두 개 이상의 아토믹 컴포넌트를 "합친 컴포넌트"의 이지만, 한 개의 페이지에서 사용될 경우: feature/[domain]
3. 도메인 내부에서 공통적으로 사용되는 컴포넌트: feature/[domain]/shared
