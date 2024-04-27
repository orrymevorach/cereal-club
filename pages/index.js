import AddCerealForm from '@/components/AddCerealForm/AddCerealForm';
import Meta from '@/components/shared/head/head';
import Table from '@/components/Table/Table';

export default function LoginPage() {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '500px',
          width: '100%',
          backgroundImage: `url(./cereal-club.jpg)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Meta />
      </div>
      <AddCerealForm />
      <Table />
    </div>
  );
}
