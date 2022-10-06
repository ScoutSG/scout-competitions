import Competition from "../../frontend/components/Competition/Detail";
import CompetitionDiscovery from "../../frontend/components/Competition/Discover";
import SimpleThreeColumns from "../../frontend/components/Home/Steps";
import PageContainer from "../../frontend/components/PageContainer";
import GroupDetail from "../../frontend/components/Group/Detail";
import Application from "../../frontend/components/Group/Application";

const Page: React.FC = () => {
  return (
    <>
      <PageContainer>
        <SimpleThreeColumns />
        <CompetitionDiscovery />
        <Competition />
        <GroupDetail />
      </PageContainer>
    </>
  );
};

export default Page;
