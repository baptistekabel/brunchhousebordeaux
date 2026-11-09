import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Page = styled.main`
  background: #FDF9F0;
  color: ${props => props.theme.colors.darkGreen};
  padding: 120px ${props => props.theme.spacing.container.padding} 80px;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Back = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${props => props.theme.colors.darkGreen};
  font-size: 14px;
  opacity: 0.8;
  margin-bottom: 24px;
  text-decoration: none;

  &:hover {
    opacity: 1;
  }
`;

const Title = styled.h1`
  font-size: clamp(32px, 6vw, 48px);
  margin-bottom: 40px;
  color: ${props => props.theme.colors.darkGreen};
`;

const Section = styled.section`
  margin-bottom: 36px;

  h2 {
    font-size: 22px;
    margin-bottom: 12px;
    color: ${props => props.theme.colors.darkGreen};
  }

  p, li {
    font-size: 15px;
    line-height: 1.7;
    opacity: 0.9;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  a {
    color: ${props => props.theme.colors.darkGreen};
    text-decoration: underline;
  }
`;

const LegalPage = () => (
  <>
    <Header />
    <Page>
      <Container>
        <Back to="/">
          <FiArrowLeft /> Retour à l'accueil
        </Back>
        <Title>Mentions légales</Title>

        <Section>
          <h2>Éditeur du site</h2>
          <ul>
            <li><strong>BRUNCH HOUSE</strong>, société par actions simplifiée (SAS) au capital de 500 €</li>
            <li>Siège social : 3 rue Ferbos, 33800 Bordeaux, France</li>
            <li>RCS Bordeaux 988 183 067 · SIRET 988 183 067 00012</li>
            <li>Code NAF : 56.10C (restauration de type rapide)</li>
            <li>Directeur général : Eddy Dafe</li>
            <li>
              Contact : sur place ou via Instagram{' '}
              <a href="https://www.instagram.com/brunchhousebordeaux/" target="_blank" rel="noopener noreferrer">
                @brunchhousebordeaux
              </a>
            </li>
          </ul>
        </Section>

        <Section>
          <h2>Directeur de la publication</h2>
          <p>Eddy Dafe, en qualité de Directeur général de la société BRUNCH HOUSE.</p>
        </Section>

        <Section>
          <h2>Hébergement</h2>
          <ul>
            <li><strong>Render Services, Inc.</strong></li>
            <li>525 Brannan Street, Suite 300, San Francisco, CA 94107, États-Unis</li>
            <li>
              <a href="https://render.com" target="_blank" rel="noopener noreferrer">render.com</a>
            </li>
          </ul>
        </Section>

        <Section>
          <h2>Conception et réalisation</h2>
          <p>
            Site conçu et développé par{' '}
            <a href="https://thecheatcode.agency/" target="_blank" rel="noopener noreferrer">TheCheatCode Agency</a>.
          </p>
        </Section>

        <Section>
          <h2>Propriété intellectuelle</h2>
          <p>
            L'ensemble des contenus de ce site (textes, photographies, logos, éléments graphiques) est la propriété
            de BRUNCH HOUSE ou de ses partenaires et est protégé par le droit de la propriété intellectuelle.
            Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable
            est interdite.
          </p>
        </Section>

        <Section>
          <h2>Données personnelles</h2>
          <p>
            Ce site ne propose pas de création de compte et ne collecte pas de données personnelles via un formulaire.
            Les réservations sont effectuées via Google ; les données transmises à cette occasion sont traitées
            conformément à la politique de confidentialité de Google.
          </p>
          <p>
            Conformément au Règlement général sur la protection des données (RGPD) et à la loi « Informatique et
            Libertés », vous disposez d'un droit d'accès, de rectification et de suppression des données vous
            concernant. Pour l'exercer, contactez-nous à l'adresse du siège social indiquée ci-dessus. Vous pouvez
            également introduire une réclamation auprès de la CNIL (
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">cnil.fr</a>).
          </p>
        </Section>

        <Section>
          <h2>Cookies et stockage local</h2>
          <p>
            Ce site n'utilise pas de cookies publicitaires. Il enregistre uniquement dans votre navigateur
            (stockage local) des informations techniques nécessaires à son fonctionnement, par exemple
            l'affichage du jeu de la roue des avis. La carte de localisation est fournie par Google Maps, qui
            peut déposer ses propres cookies lors de son affichage.
          </p>
        </Section>

        <Section>
          <h2>Responsabilité</h2>
          <p>
            Les informations présentes sur ce site (menu, prix, horaires) sont données à titre indicatif et
            peuvent évoluer. BRUNCH HOUSE ne saurait être tenue responsable d'éventuelles erreurs ou omissions.
          </p>
        </Section>
      </Container>
    </Page>
    <Footer />
  </>
);

export default LegalPage;
