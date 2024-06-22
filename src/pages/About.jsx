import Header from "../comp/header";
import Footer from "../comp/Footer";
import Loading from "../comp/Loading";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";

const About = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !loading) {
      navigate("/");
    }

    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <Loading />;
  }

  if (user && user.emailVerified) {
    return (
      <>
        <Helmet>
          <title>About Page</title>
        </Helmet>
        <Header />
        <main>
          <h1>قريبا,قسم مفتوح لتسجيل تعليقاتكم </h1>
          <div id="disqus_thread"></div>
          <script>
            {`
              var disqus_config = function () {
                this.page.url = window.location.href;  
                this.page.identifier = window.location.pathname; 
              };

              (function() { 
                var d = document, s = d.createElement('script');
                s.src = 'https://YOUR_DISQUS_SHORTNAME.disqus.com/embed.js'; // Replace YOUR_DISQUS_SHORTNAME with your actual Disqus shortname
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
              })();
            `}
          </script>
          <noscript>
            Please enable JavaScript to view the
            <a href="https://disqus.com/?ref_noscript" rel="nofollow">
              comments powered by Disqus.
            </a>
          </noscript>
        </main>
        <Footer />
      </>
    );
  }

  return null;
};

export default About;
