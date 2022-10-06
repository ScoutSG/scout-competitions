import Competition from "../../frontend/components/Competition/Detail";
import CompetitionDiscovery from "../../frontend/components/Competition/Discover";
import SimpleThreeColumns from "../../frontend/components/Home/Steps";
import PageContainer from "../../frontend/components/PageContainer";

const Page: React.FC = () => {
  return (
    <>
      <PageContainer>
        <SimpleThreeColumns />
        <CompetitionDiscovery />
        <Competition />
      </PageContainer>
    </>
  );
};

export default Page;
