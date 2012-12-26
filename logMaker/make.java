import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintStream;

public class make {
	//	replace /* {line} */ to line
	public static final String linePattern = "\\/\\*\\s*\\{line\\}\\s*\\*\\/";
	
	public static void main(String[] args) throws IOException{
		UnicodeReader r = new UnicodeReader(new FileInputStream("../src/" + args[0]), null);
		BufferedReader inp = new BufferedReader(r);
		
		FileOutputStream fos = new FileOutputStream("../dst/" + args[0]);
		PrintStream ps = new PrintStream(fos, true, "UTF-8");
		String sen = "";
		int i = 0;
		
		while((sen = inp.readLine()) != null){		
			sen = sen.replaceAll(linePattern, ", " + (++i));
			ps.println(sen);
		}

	}
}
