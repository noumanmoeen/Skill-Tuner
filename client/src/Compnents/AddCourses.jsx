import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Multiselect } from "multiselect-react-dropdown";
import auth_axios from "../utils/auth_axios";

class AddCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { name: "programming", id: 1 },
        { name: "Seo", id: 2 },
        { name: "technicalWriting", id: 3 },
        { name: "photoShop", id: 4 },
        { name: "management", id: 5 },
        { name: "speaking", id: 6 },
        { name: "finance", id: 7 },
        { name: "Accounting", id: 8 },
        { name: "Microsoft office", id: 9 },
        { name: "Graphics", id: 10 },
      ],
      category: [],
      title: "",
      subject: "",
      duration: "",
      skills: [],
      description: "",
      selectedCategory: "",
      coverPicture: null,
      loading: false,
      price: 0,
    };
  }

  async componentDidMount() {
    await auth_axios
      .get("/api/category/getAllCategory")
      .then((res) => {
        console.log(res.data);
        this.setState({ category: res.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handleFile = (e) => {
    console.log(e.target.files[0]);
    const validImageTypes = [
      "image/gif",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if (!validImageTypes.includes(e.target.files[0].type)) {
      toast.error("please insert picture");
    } else {
      this.setState({ coverPicture: e.target.files[0] });
    }
  };

  onSelectCategory = (e) => {
    this.setState({ selectedCategory: e.target.value });
  };

  onSelectSkill = (selectedList) => {
    this.setState({ skills: selectedList });
  };

  onRemoveSkill = (selectedList) => {
    this.setState({ skills: selectedList });
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleAddCourse = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    if (
      this.state.title.length == 0 ||
      this.state.description.length == 0 ||
      this.state.coverPicture == null ||
      this.state.skills.length == 0 ||
      this.state.subject.length == 0 ||
      this.state.duration.length == 0 ||
      this.state.category.length == 0
    ) {
      toast.error("Please fill all fields to add Course!!");
    } else {
      const skills = [];
      const skillsData = this.state.skills;

      skillsData.forEach(getNames);
      function getNames(object) {
        skills.push(object.name);
      }

      const formData = new FormData();
      formData.append("coverPicture", this.state.coverPicture);
      formData.append("title", this.state.title);
      formData.append("subject", this.state.subject);
      formData.append("duration", this.state.duration);
      formData.append("description", this.state.description);

      formData.append("category", this.state.selectedCategory);
      formData.append("skills", skills);
      formData.append("price", this.state.price);
      auth_axios
        .post("/api/courses/add", formData)
        .then((res) => {
          if (res.status == 200) {
            this.setState({ loading: false });
            setTimeout(() => {
              toast.success("Course Added Successfully!!");
              window.location.reload();
            }, 1200);
          } else {
            toast.error("there is an error in course addition");
            this.setState({ loading: false });
          }
        })
        .catch((err) => {
          if (err.response && Array.isArray(err.response.data.messages)) {
            const msgs = err.response.data.messages.map((v) => {
              toast.error(v.msg);
            });
            this.setState({ loading: false });
            this.setState({ errorMessages: msgs });
          }
          throw err;
        });
    }
  };
  render() {
    return (
      <>
        <div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <main
            className="justify-center flex-1 py-10 px-10"
            style={{ paddingBottom: "1rem" }}
          >
            <h1 className="text-3xl font-bold text-gray-600">Course</h1>
          </main>
          <div
            className="container mx-auto md:container md:mx-auto sm:container sm:mx-auto lg:container"
            style={{ width: 1200 }}
          >
            <main className="md:p-0  lg:px-8  ">
              <section className="bg-cream-lighter p-4 shadow">
                <div className="md:flex">
                  <h2 className="md:w-1/3 uppercase tracking-wide text-sm sm:text-lg mb-6">
                    Add new Course
                  </h2>
                </div>
                <form>
                  <div className="md:flex mb-8">
                    <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
                      <div className="md:flex mb-4">
                        <div className="md:flex-1 md:pr-3">
                          <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                            Course Title
                          </label>
                          <input
                            className="w-full shadow-inner p-2 border-0"
                            type="text"
                            name="title"
                            onChange={(e) => {
                              this.handleChange(e);
                            }}
                            placeholder="Title"
                          />
                        </div>
                        <div className="md:flex-1 md:pr-3">
                          <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                            Course Cover image
                          </label>
                          <input
                            className="w-full p-2"
                            type="file"
                            onChange={(e) => this.handleFile(e)}
                            name="coverPicture"
                          />
                        </div>
                      </div>
                      <div className="md:flex mb-4">
                        <div className="md:flex-1 md:pr-3">
                          <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                            Subject
                          </label>
                          <input
                            className="w-full shadow-inner p-2 border-0"
                            type="text"
                            name="subject"
                            onChange={(e) => {
                              this.handleChange(e);
                            }}
                            placeholder="subject"
                          />
                        </div>
                        <div className="md:flex-1 md:pl-3">
                          <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                            Skills
                          </label>

                          <Multiselect
                            options={this.state.options} // Options to display in the dropdown
                            // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                            onSelect={this.onSelectSkill} // Function will trigger on select event
                            onRemove={this.onRemoveSkill} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                            selectionLimit="5"
                            placeholder="Select Skills"
                          />
                        </div>
                      </div>
                      <div className="md:flex mb-4">
                        <div className="md:flex-1 md:pr-3">
                          <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                            Course Duration
                          </label>
                          <input
                            className="w-full shadow-inner p-2 border-0"
                            type="text"
                            name="duration"
                            onChange={(e) => {
                              this.handleChange(e);
                            }}
                            placeholder="duration eg: 2-weeks"
                          />
                        </div>
                        <div className="md:flex-1 md:pl-3">
                          <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                            Category
                          </label>
                          {this.state.category.length > 0 ? (
                            <select
                              className="w-full border bg-white rounded px-3 py-2 outline-none"
                              onChange={this.onSelectCategory}
                            >
                              <option value="" disable selected>
                                Select category
                              </option>
                              {this.state.category.map((data, index) => {
                                return (
                                  <option
                                    key={index}
                                    className="py-1"
                                    value={data._id}
                                  >
                                    {data.name}
                                  </option>
                                );
                              })}
                            </select>
                          ) : null}
                        </div>
                        <div className="md:flex-1 md:pl-3">
                          <label className="block uppercase tracking-wide text-charcoal-darker text-xs font-bold">
                            Course Price
                          </label>
                          <input
                            className="w-full shadow-inner p-2 border-0"
                            type="number"
                            name="price"
                            onChange={(e) => {
                              this.handleChange(e);
                            }}
                            placeholder="price in pkr"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block uppercase tracking-wide text-xs font-bold">
                          Course Description:
                        </label>
                        <textarea
                          className="w-full shadow-inner p-2 border-0"
                          type="text"
                          rows="3"
                          name="description"
                          onChange={(e) => {
                            this.handleChange(e);
                          }}
                          placeholder="Introduce your Course here."
                        />
                      </div>
                      <button
                        type="button"
                        onClick={(e) => this.handleAddCourse(e)}
                        class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md  bg-gradient-to-r from-blue-400 to-blue-600 transform hover:scale-110 text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150"
                      >
                        {this.state.loading ? (
                          <svg
                            class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              class="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              stroke-width="4"
                            />
                            <path
                              class="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                        ) : null}
                        Add Course
                      </button>
                    </div>
                  </div>
                </form>
              </section>
            </main>
          </div>
        </div>
      </>
    );
  }
}

export default AddCourse;
