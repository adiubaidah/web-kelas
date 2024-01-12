import { Tree, TreeNode } from "react-organizational-chart";
import Person from "@/pages/Home/components/Person";

const Structure2 = () => {
  return (
    <section className="container max-w-full">
      <h2 className="font-lemon text-xl md:text-3xl text-center text-yellow-300">
        Struktur Kelas
      </h2>
      <div className="mt-10">
        <Tree
          lineWidth={"2px"}
          lineColor={"white"}
          lineBorderRadius={"10px"}
          label={<Person name="Alvionitha Sari" jabatan="Wali kelas" />}
        >
          <TreeNode label={<Person name="Alfian" jabatan="Ketua" />}>
            <TreeNode
              label={<Person name="Alfian" jabatan="Ketua" />}
            ></TreeNode>
            <TreeNode
              label={<Person name="Alfian" jabatan="Ketua" />}
            ></TreeNode>
          </TreeNode>
          <TreeNode
            label={<Person name="Irham" jabatan="Wakil Ketua" />}
          >
            <TreeNode
              label={<Person name="Irham" jabatan="Wakil Ketua" />}
            ></TreeNode>
            <TreeNode
              label={<Person name="Irham" jabatan="Wakil Ketua" />}
            ></TreeNode>
          </TreeNode>
        </Tree>
      </div>
    </section>
  );
};

export default Structure2;
