using System;
using System.Collections.Generic;
using System.Linq;
using System.Speech.Synthesis;
using System.Text;
using System.Threading.Tasks;

namespace WorkflowClient
{
    class Program
    {
        static void Main(string[] args)
        {
            SpeechSynthesizer s = new SpeechSynthesizer();
            s.Speak("Hello. World.");
        }
    }
}
