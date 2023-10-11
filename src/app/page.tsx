import Image from 'next/image'

export default function Home() {
  // const [loggedInUser, setLoggedInUser] = useState(
  //   JSON.parse(localStorage.getItem("loggedInUser"))
  // );
  // const [savedUsers, setSavedUsers] = useState(
  //   JSON.parse(localStorage.getItem("savedUsers")) || []
  // );

  // useEffect(() => {
  //   localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  //   if (loggedInUser) {
  //     const uniqueSavedUsers = savedUsers.filter(
  //       (user) =>
  //         user.username !== loggedInUser.username &&
  //         user.password !== loggedInUser.password
  //     );

  //     localStorage.setItem(
  //       "savedUsers",
  //       JSON.stringify([...uniqueSavedUsers, loggedInUser])
  //     );
  //   }
  // }, [loggedInUser]);

  return (
    <>
    <div className="bg-slate-200">
    <span className="bg-red-200 w-full">None</span>
    </div>
    </>
    // <Router>
    //   <header className="headerContainer"></header>

    //   <main className="mainContainer">
    //     <Routes>
    //       <Route path="/" element={<WelcomePage />} />
    //       <Route
    //         path="/signup"
    //         element={<SignUpPage savedUsers={savedUsers} />}
    //       />
    //       <Route
    //         path="/login"
    //         element={<LoginPage setLoggedInUser={setLoggedInUser} />}
    //       />
    //       <Route path="/home" element={<Home user={loggedInUser} />} />
    //       <Route
    //         path="/direct-messages"
    //         element={<DirectMessages user={loggedInUser} />}
    //       />
    //       {/* <Route path="/channels" element={<Channels user={loggedInUser} />} /> */}
    //     </Routes>
    //   </main>

    //   <footer>
    //     <h6>2023 Slack-like App</h6>
    //   </footer>
    // </Router>
  );
}
