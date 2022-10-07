import Competition from "../../components/Competition/Detail";
import CompetitionDiscovery from "../../components/Competition/Discovery";
import SimpleThreeColumns from "../../components/Home/Steps";
import PageContainer from "../../components/PageContainer";
import GroupDetail from "../../components/Group/Detail";

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
